  
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
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >H1</button>
          
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >H2</button>
          
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >H3</button>
          
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
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <font-awesome-icon icon="strikethrough"/>
          </button>
          
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <font-awesome-icon icon="underline"/>
          </button>
          
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <font-awesome-icon icon="paragraph"/>
          </button>
          
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <font-awesome-icon icon="list-ul"/>
          </button>
          
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <font-awesome-icon icon="list-ol"/>
          </button>
          
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <font-awesome-icon icon="quote-right"/>
          </button>
          
          <button class="menubar__button" @click="commands.horizontal_rule">
            <font-awesome-icon icon="minus"/>
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
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >
            <font-awesome-icon icon="expand"/>
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
  HorizontalRule,
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
  Strike,
  Underline,
  History
} from "tiptap-extensions";
import { setTimeout, clearTimeout } from "timers";

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
          new HorizontalRule(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History()
        ],
        content: `
          <h2>This is my <strong>first</strong> note</h2><hr><p></p><p>I am able to export my data as <s>javascript </s><code>HTML</code> or <code>JSON</code>. To pass <code>HTML</code> to the editor use the <code>content</code> slot. To pass <code>JSON</code> to the editor use the <code>doc</code> prop.</p><p></p><h3>What can i do?</h3><p></p><p>All kinds of <strong>cool</strong> stuff like typing a coding block </p><pre><code>alert("You're awesome")</code></pre><p></p><p>or maybe make a list like so</p><p></p><ul><li><p>This</p></li><li><p>is </p></li><li><p>Amazing</p></li></ul><h3></h3><blockquote><h1>What can i do</h1></blockquote><p></p>
        `,
        onUpdate: ({ getJSON, getHTML }) => {
          if (this.timer) {
            clearTimeout(this.timer);
            this.timer = undefined;
          }
          
          this.timer = setTimeout(function() {
            alert("content was saved");
            this.json = getJSON();
            this.html = getHTML();
          }, 2000);
        }
      }),
      json: "Update content to see changes",
      html: "Update content to see changes",
      timer: undefined
    };
  },
  methods: {
    saveContent(getJSON, getHTML) {
      alert("content was saved");
      this.json = getJSON();
      this.html = getHTML();
    },
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
  font-size: 14px;
  color: #959595 !important;
  font-weight: bold;
  transition: 0.4s;
  margin: 10px 10px 0px 10px;
}
.menubar__button:hover {
  color: #de4b50 !important;
}
</style>
