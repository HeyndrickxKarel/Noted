  
    <template>
  <div>
    <div class="editorBox">
      <div class="hoverContainer">
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
      </div>
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
        content: `<h2>This is my <strong>first</strong> note</h2><hr><p></p><p>I am able to export my data as <s>javascript </s><code>HTML</code> or <code>JSON</code>. To pass <code>HTML</code> to the editor use the <code>content</code> slot. To pass <code>JSON</code> to the editor use the <code>doc</code> prop.</p><p></p><h3>What can i do?</h3><p></p><p>All kinds of <strong>cool</strong> stuff like typing a coding block </p><pre><code>alert("You're awesome")</code></pre><p></p><p>or maybe make a list like so</p><p></p><ul><li><p>This</p></li><li><p>is </p></li><li><p>Amazing</p></li></ul><h3></h3><blockquote><h1>What can i do</h1></blockquote><p></p>`,

        onUpdate: ({ getJSON, getHTML }) => {
          this.json = getJSON();
          this.html = getHTML();
        }
      }),
      json: "Update content to see changes",
      html: "Update content to see changes",
      timer: undefined
    };
  },
  methods: {
    clearContent() {
      this.editor.clearContent(true);
      this.editor.focus();
    }
  },
  computed: {
    activeNote() {
      return this.$store.getters.activeNote;
    }
  },
  mounted() {
    this.editor.setContent(this.$store.getters.activeNote);
    this.$store.commit("toggleNoteWasClicked");
  },
  watch: {
    activeNote(newNote) {
      if (this.$store.getters.noteWasClicked) {
        this.editor.setContent(newNote);
        this.$store.commit("toggleNoteWasClicked");
        this.editor.focus();
      }
    },
    json: function(newJson) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = undefined;
      }
      var currentNoteIndex = this.$store.getters.activeNoteIndex;
      this.timer = setTimeout(() => {
        this.json.dateCreated = new Date();
        this.$store.commit("updateNote", {
          newNote: newJson,
          index: currentNoteIndex
        });
        this.$store.commit("saveNotes");
      }, 1000);
    }
  }
};
</script>


<style lang="scss">
.editorBox {
  border-left: 1px solid rgb(212, 212, 212);
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
}
.editor {
  height: 100vh;
  overflow-y: scroll;
  width: 100%;
  ul {
    list-style: inherit !important;
  }
}
.editor > div {
  height: 100vh;
  outline: none;
  padding: 6%;
}
.hoverContainer{
  width: fit-content;
  max-width: 80%;
  margin: 0 auto;
  &:hover .menubar{
        transform: translateY(0px);
  }
  position: absolute;
    left: 10%;
    height: 50px;

}
.menubar {
    -webkit-transition: 0.4s;
    transition: 0.4s;
    text-align: center;
    overflow-y: hidden;
    background-color: #353841;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    transform: translateY(-200px);
    padding: 0px 20px;
    cursor: pointer;
}


.menubar__button {
  margin: 10px;
}
</style>
