/**
 * Get component dimensions based on window dimensions
 *
 * @return {Object} - componentWidth and componentHeight keys
 */
export function getComponentDimensions() {
  const componentWidth = window.innerWidth < 640 ? window.innerWidth : 640;
  const componentHeight = componentWidth < 640 ? componentWidth / 1.3 : 480;

  return {componentWidth, componentHeight};
}
