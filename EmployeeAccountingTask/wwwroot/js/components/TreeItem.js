export const TreeItem = {
    name: "TreeItem",
    props: ['item'],
    data() { return { open: false } },
    methods: {
        getEmployees() { this.$emit('select-subdivision', this.item); },
        toggleOpen(e) { e.stopPropagation(); this.open = !this.open; }
    },
    template: `
      <li>
        <div style="display:flex; justify-content:space-between; align-items:center">
          <div class="div-name-subdivision"
               @click="getEmployees()"
               @contextmenu.prevent="$emit('contextmenu-node', $event, item)">
            {{ item.name }}
          </div>
          <div class="char" v-if="item.subdivisionsChildrens" @click="toggleOpen" style="margin-right:5px">
            <div v-if="open">&#8593;</div>
            <div v-else>&#8595;</div>
          </div>
        </div>
        <ul v-if="item.subdivisionsChildrens?.length && open">
          <tree-item
              v-for="child in item.subdivisionsChildrens"
              :key="child.idSubdivision"
              :item="child"
              @select-subdivision="$emit('select-subdivision', $event)"
              @contextmenu-node="($event,item) => $emit('contextmenu-node',$event,item)">
          </tree-item>
        </ul>
      </li>`
};