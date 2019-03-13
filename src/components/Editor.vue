  
    <template>
  <div>
    <div class="editorBox">
      <editor-menu-bar :editor="editor">
        <div
          class="menubar"
          :class="{ 'is-shown': focused, 'is-not-shown': !focused }"
          slot-scope="{ commands, isActive, focused }"
        >
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <font-awesome-icon icon="bold"/>
          </button>
          
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <font-awesome-icon icon="italic"/>
          </button>
          
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            <font-awesome-icon icon="code"/>
          </button>
          
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >            <font-awesome-icon icon="paragraph"/>
</button>
          
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          ><strong>H1</strong></button>
          
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          ><strong>H2</strong></button>
          
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          ><strong>H3</strong></button>
          
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >            <font-awesome-icon icon="list-ul"/>
          </button>
          
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >            <font-awesome-icon icon="list-ol"/>
          </button>
          
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >            <font-awesome-icon icon="expand"/>
          </button>
        </div>
      </editor-menu-bar>

      <editor-content class="editor__content editor" :editor="editor"/>
    </div>
  </div>
</template>


<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  History
} from "tiptap-extensions";

export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new History()
        ],
        content: `
          <h2>
            Export HTML or JSON
          </h2>
          <p>
            You are able to export your data as <code>HTML</code> or <code>JSON</code>. To pass <code>HTML</code> to the editor use the <code>content</code> slot. To pass <code>JSON</code> to the editor use the <code>doc</code> prop.
          </p>
        `,
        onUpdate: ({ getJSON, getHTML }) => {
          this.json = getJSON();
          this.html = getHTML();
        }
      }),
      json: "Update content to see changes",
      html: "Update content to see changes"
    };
  },
  methods: {
    clearContent() {
      this.editor.clearContent(true);
      this.editor.focus();
    },
    setContent() {
      // you can pass a json document
      this.editor.setContent(
        {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "This is some inserted text. 👋"
                }
              ]
            }
          ]
        },
        true
      );
      // HTML string is also supported
      // this.editor.setContent('<p>This is some inserted text. 👋</p>')
      this.editor.focus();
    }
  }
};
</script>


<style lang="scss">
.editorBox {
  border-left: 1px solid rgb(212, 212, 212);
  height: 100vh;
}
.editor {
  height: 100vh;

  ul {
    list-style: inherit !important;
  }
}
.editor > div {
  height: 100vh;
  outline: none;
  padding: 6%;
  padding-top: 2%;
}
.menubar {
  transition: 0.4s;
  margin-top: 20px;
  opacity: 0;
  text-align: center;
}
.menubar:hover {
  opacity: 1;
}

.menubar__button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #959595;
  transition: 0.4s;
  margin: 10px 10px 0px 10px;
}
.menubar__button:hover {
  color: #de4b50;
}
</style>
