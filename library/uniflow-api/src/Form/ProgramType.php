<?php

namespace App\Form;

use App\Entity\Folder;
use App\Entity\Program;
use App\Form\Transformer\PathTransformer;
use App\Form\Transformer\ClientTransformer;
use App\Form\Transformer\TagTransformer;
use App\Form\Type\ArrayType;
use App\Services\ClientService;
use App\Services\FolderService;
use App\Services\TagService;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ProgramType extends AbstractType
{
    /**
     * @var ClientService
     */
    protected $clientService;

    /**
     * @var TagService
     */
    protected $tagService;

    /**
     * @var FolderService
     */
    protected $folderService;

    public function __construct(
        ClientService $clientService,
        TagService $tagService,
        FolderService $folderService
    )
    {
        $this->clientService = $clientService;
        $this->tagService = $tagService;
        $this->folderService = $folderService;
    }

    /**
     * Build Form
     *
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('name', TextType::class);
        $builder->add('slug', TextType::class);
        $builder->add('clients', CollectionType::class, [
            'entry_type' => TextType::class,
            'allow_add' => true,
            'allow_delete' => true,
        ]);
        $builder->add('tags', CollectionType::class, [
            'entry_type' => TextType::class,
            'allow_add' => true,
            'allow_delete' => true,
        ]);
        $builder->add('description', TextareaType::class);
        $builder->add('public', CheckboxType::class);
        $builder->add('path', ArrayType::class, [
            'property_path' => 'folder',
        ]);

        $clientTransformer = new ClientTransformer($this->clientService);
        $builder->get('clients')->addModelTransformer($clientTransformer);
        $tagTransformer = new TagTransformer($this->tagService);
        $builder->get('tags')->addModelTransformer($tagTransformer);
        $pathTransformer = new PathTransformer($this->folderService, $options['data']->getUser());
        $builder->get('path')->addModelTransformer($pathTransformer);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Program::class,
        ]);
    }
}
