export const getNodeSizes = (node) => {
  return node
    ? {
        width: node.clientWidth,
        height: node.clientHeight,
      }
    : {
        width: 0,
        height: 0,
      };
};
