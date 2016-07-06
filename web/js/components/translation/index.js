import Vue from 'vue'
import template from './template.html!text'

export default Vue.extend({
    template: res.text,
    data() {
        return {
            'host': 'localhost',
            'port':  2222,
            'username': 'math',
            'root': '/Users/math/Sites',
            'privateKey': '/var/www/puphpet/files/dot/ssh/my_id_rsa',
            'symfonyPath': '/decleor',
            'content': null
        }
    },

    methods: {
        onSubmit: function() {
            superagent.post(server.getBaseUrl() + '/component/sftp/read')
                .type('form')
                .send({
                    'host': this.host,
                    'port':  this.port,
                    'username': this.username,
                    'root': this.root + this.symfonyPath,
                    'privateKey': this.privateKey,
                    'path': 'app/Resources/translations/messages.fr.yml'
                }).end((err, res) => {
                    console.log(res);
                    this.content = res.body.content;
                });
        }
    }
});