const { createElement } = wp.element;
const { registerBlockType } = wp.blocks;

registerBlockType("gm18_recipe_block/recipe_block", {
  title: "Hello World",
  description: "Just another Hello World block",
  icon: "admin-site",
  category: "common",

  edit: function() {
    return <p>Hello Editor</p>;
  },

  save: function() {
    return <p>Hello Frontend</p>;
  }
});
