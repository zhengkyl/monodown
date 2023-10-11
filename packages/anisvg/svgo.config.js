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

        const allowedStyles = [
          /fill:#[0-9a-f]{6}/,
          /fill:url\(#[0-9a-zA-Z]+\)/,
          /fill-opacity:0\.\d+/,
          /stop-color:#[0-9a-f]{6}/,
          /stop-opacity:0?\.?\d+/,
        ];

        for (const node of styleNodes) {
          const newStyle = [];
          for (const allowedStyle of allowedStyles) {
            const segment = node.attributes.style.match(allowedStyle);
            if (segment) {
              newStyle.push(segment[0]);
            }
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
