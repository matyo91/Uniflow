import Vue from 'vue'
import template from './template.html!text'

import TextMessage from '../../../messages/text.js'

export default Vue.extend({
    template: template,
    data() {
        return {
            content: null
        }
    },
    methods: {
        onDelete: function () {
            this.$emit('pop');
        },
        handleTypes: function() {
            return [TextMessage];
        },
        handle: function (message) {
            if(message instanceof TextMessage) {
                this.content = message.text;
            }
        }
    }
});