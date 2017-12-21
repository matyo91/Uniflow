import React from 'react'

export default () => (
    <div>
        {/*<div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Infos</h3>
            <div class="box-tools pull-right">
                <a class="btn btn-box-tool" @click.prevent="onDuplicate"><i class="fa fa-clone"></i></a>
                <a class="btn btn-box-tool" @click.prevent="onDelete"><i class="fa fa-times"></i></a>
            </div>
        </div>
        <div class="box-body">
            <form class="form-horizontal">

                <div class="form-group">
                    <label for="info_title_{{ _uid }}" class="col-sm-2 control-label">Title</label>

                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="info_title_{{ _uid }}" :value="history.title" @input="onUpdateTitle" placeholder="Title" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="info_tags_{{ _uid }}" class="col-sm-2 control-label">Tags</label>

                    <div class="col-sm-10">
                        <tagit type="text" class="form-control" id="info_tags_{{ _uid }}" :value="history.tags" @input="onUpdateTags" :options="tagsOptions" placeholder="Tags" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="info_description_{{ _uid }}" class="col-sm-2 control-label">Description</label>

                    <div class="col-sm-10">
                        <ace class="form-control" id="info_description_{{ _uid }}" v-model="history.description" @input="onUpdateDescription" placeholder="Text" height="200"></ace>
                    </div>
                </div>

            </form>
        </div>
    </div>

    <ul class="timeline">
        <li class="time-label">
          <span class="bg-green">
            <a class="btn btn-success pull-right" @click.prevent="run()"><i class="fa fa-fw fa-play"></i> Play</a>
          </span>
        </li>
        <li v-for="item in uiStack">
            <i v-if="item.component != 'search'" class="fa fa-play bg-blue" @click.prevent="run(item.index)"></i>

            <div class="timeline-item" :class="{'bg-green': item.active, 'component':(item.component != 'search')}">
                <div class="timeline-body">
                    <div :is="item.component" :bus="item.bus"
                         @push="onPushFlow(arguments[0], item.index)"
                         @pop="onPopFlow(item.index)"
                         @update="onUpdateFlow(arguments[0], item.index)"
                    >
                    </div>
                </div>
            </div>
        </li>
    </ul>*/}
    </div>
)