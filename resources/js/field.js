import DetailField from './components/DetailField'
import FormField from './components/FormField'

Nova.booting((Vue, router) => {
    Vue.component('detail-nova-tiptap-field', DetailField);
    Vue.component('form-nova-tiptap-field', FormField);
})
