<template>
    <default-field
        :field="field"
        :errors="errors"
        :full-width-content="true"
        :show-help-text="showHelpText"
    >
        <template slot="field">
            <editor-menu-bar :editor="editor">
                <div class="menubar" slot-scope="{ commands, isActive, getMarkAttrs }">
                    <div class="toolbar">
                        <template v-for="(buttonKey, params) in buttons">
                            <template v-if="buttonKey == 'heading' || params == 'heading'">
                                <heading-buttons
                                    :key="'button-'+buttonKey"
                                    :headingLevels="headingLevels"
                                    :commands="commands"
                                    :isActive="isActive"
                                >
                                </heading-buttons>
                            </template>

                            <template v-if="buttonKey == 'table' || params == 'table'">
                                <table-buttons
                                    :key="'button-'+buttonKey"
                                    :commands="commands"
                                    :isActive="isActive"
                                >
                                </table-buttons>
                            </template>

                            <template v-if="
                                buttonKey != 'heading'
                                && buttonKey != 'link'
                                && params != 'heading'
                                && buttonKey != 'table'
                            ">
                                <normal-button
                                    :key="'button-'+buttonKey"
                                    :buttonKey="buttonKey"
                                    :commands="customCommands(commands)"
                                    :isActive="isActive"
                                >
                                </normal-button>
                            </template>

                            <span
                                :key="'button-'+buttonKey"
                                class="tiptap-button-container"
                                v-if="buttonKey == 'link'"
                            >
                                <link-button
                                    :commands="commands"
                                    :isActive="isActive"
                                    :linkMenuIsActive="linkMenuIsActive"
                                    :linkUrl="linkUrl"
                                    :hideLinkMenu="hideLinkMenu"
                                    :showLinkMenu="showLinkMenu"
                                    :getMarkAttrs="getMarkAttrs"
                                    :setLinkUrl="setLinkUrl"
                                >
                                </link-button>
                            </span>

                        </template>
                    </div>
                </div>
            </editor-menu-bar>

            <editor-content
                :id="field.attribute"
                class="
                tiptap-content
                py-3 h-auto
                pr-6
                pb-4
                pt-4
                w-full
                form-control
                form-input
                form-input-bordered
                mt-2
                no-focus
                "
                :editor="editor"
                v-if="!editHTML"
            />
            <textarea
                    v-model="value"
                    @change="updateEditorValue"
                    v-if="editHTML"
                    class="w-full form-control form-input form-input-bordered py-3 h-auto edit-html"
            ></textarea>
        </template>
    </default-field>
</template>

<script>

import { FormField, HandlesValidationErrors } from 'laravel-nova';
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap';
import HeadingButtons from './buttons/HeadingButtons';
import TableButtons from './buttons/TableButtons';
import NormalButton from './buttons/NormalButton';
import LinkButton from './buttons/LinkButton';

import {
    Blockquote,
    CodeBlock,
    HardBreak,
    Heading,
    OrderedList,
    BulletList,
    HorizontalRule,
    ListItem,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic,
    Link,
    Table,
    TableHeader,
    TableCell,
    TableRow,
    Strike,
    Underline,
    History,
} from 'tiptap-extensions';

import { Superscript } from 'tiptap-extension-superscript';
import { Subscript } from 'tiptap-extension-subscript';

import Iframe from '../extensions/iframe.js';

export default {
    mixins: [FormField, HandlesValidationErrors],

    props: ['resourceName', 'resourceId', 'field'],

    components: {
        EditorContent,
        EditorMenuBar,
        HeadingButtons,
        TableButtons,
        NormalButton,
        LinkButton,
    },

    data: function () {
        return {
            headingLevels: 6,

            linkUrl: null,

            linkMenuIsActive: false,

            editor: null,

            editHTML: false,
        }
    },

    computed: {
        buttons() {
            return this.field.buttons ? this.field.buttons : ['bold', 'italic'];
        }
    },

    methods: {
        initEditor() {
            let outsideScope = this;

            this.editor = new Editor({
                onUpdate(state){
                    outsideScope.value = state.getHTML();
                },
                extensions: [
                    new Blockquote(),
                    new BulletList(),
                    new CodeBlock(),
                    new HardBreak(),
                    new Heading({ levels: [1, 2, 3, 4, 5, 6] }),
                    new HorizontalRule(),
                    new ListItem(),
                    new OrderedList(),
                    new TodoItem(),
                    new TodoList(),
                    new Bold(),
                    new Code(),
                    new Italic(),
                    new Link(),
                    new Strike(),
                    new Underline(),
                    new History(),
                    new Table({
                        resizable: true,
                    }),
                    new TableHeader(),
                    new TableCell(),
                    new TableRow(),
                    new Superscript(),
                    new Subscript(),
                    new Iframe(),
                ],
                editorProps: {
                    handleKeyDown: (editorView, keyboardEvent) => {
                        // Prevent ? or / from triggering Nova global search
                        keyboardEvent.stopPropagation();
                    }
                }
            });

            this.editor.setContent(this.value);

            // set heading levels
            if (this.field.headingLevels) {
                this.headingLevels = this.field.headingLevels;
            } else {
                // fallback for the old style like this: 'heading' => 4
                _.forEach(this.buttons, function(params, key) {
                    if (key == 'heading') {
                        this.headingLevels = params;
                    }
                }.bind(this));
            }

        },

        showLinkMenu(attrs) {
            this.linkUrl = attrs.href;
            this.linkMenuIsActive = true;
        },

        hideLinkMenu() {
            this.linkUrl = null;
            this.linkMenuIsActive = false;
        },

        setLinkUrl(command, url) {
            command({ href: url });
            this.hideLinkMenu();
            this.editor.focus();
        },

        updateEditorValue() {
            this.editor.setContent(this.value);
        },

        customCommands(commands) {

            commands.edit_html = function () {
                this.editHTML = !this.editHTML;
                if (this.editHTML) {
                    this.value = pretty(this.value);
                }
            }.bind(this);

            return commands;
        }
    },

    mounted: function () {
        this.initEditor();
    }
}
</script>
