export const getStylePropertyValue = (nodeEl, ...styleProps) => {
  const instance = window.getComputedStyle(nodeEl, null);
  const propsValues = styleProps.reduce((acc, el) => {
    acc[el] = instance.getPropertyValue(el);
    return acc;
  }, {});

  return propsValues;
};
