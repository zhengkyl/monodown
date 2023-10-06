const path = require("node:path");
const { querySelectorAll, querySelector } = require("svgo/lib/xast.js");

module.exports = {
  js2svg: {
    indent: 2,
    pretty: true,
  },
  plugins: [
    {
      name: "plugin",
      fn: (root, params, info) => {
        const labelNodes = querySelectorAll(root, "[inkscape\\:label]");
        for (const node of labelNodes) {
          node.attributes["data-label"] = node.attributes["inkscape:label"];
        }

        const hrefNodes = querySelectorAll(root, "[xlink\\:href]");
        for (const node of hrefNodes) {
          node.attributes["href"] = node.attributes["xlink:href"];
          delete node.attributes["xlink:href"];
        }

        const styleNodes = querySelectorAll(root, "[style]");

        for (const node of styleNodes) {
          const fill = node.attributes.style.match(/fill:#[0-9a-f]{6}/);
          const opacity = node.attributes.style.match(/fill-opacity:0\.\d+/);
          const newStyle = [];
          if (fill) {
            newStyle.push(fill[0]);
          }
          if (opacity) {
            newStyle.push(opacity[0]);
          }
          if (!newStyle.length) {
            delete node.attributes.style;
            continue;
          }
          node.attributes.style = newStyle.join(";");
        }
      },
    },
    {
      name: "preset-default",
      params: {
        overrides: {
          collapseGroups: false,
          convertPathData: {
            // Disable all optimizations that change node type or number of nodes
            makeArcs: false,
            straightCurves: false,
            lineShorthands: false,
            collapseRepeated: false,
            curveSmoothShorthands: false,
          },
        },
      },
    },
    "removeDimensions", // height/width -> viewbox
    {
      name: "removeAttributesBySelector",
      params: {
        selectors: [
          {
            selector: "svg",
            attributes: "xmlns:xlink",
          },
          {
            selector: "clipPath",
            attributes: "clipPathUnits",
          },
          {
            selector: "use",
            attributes: ["width", "height"],
          },
        ],
      },
    },
    {
      name: "reorder attributes",
      fn: (root, params, info) => {
        const labelNodes = querySelectorAll(root, "[data-label]");
        for (const node of labelNodes) {
          node.attributes = Object.assign(
            {
              "data-label": "",
            },
            node.attributes
          );
        }
      },
    },
  ],
};
