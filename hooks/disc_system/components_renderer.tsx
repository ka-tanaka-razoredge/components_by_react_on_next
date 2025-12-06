import { createRoot } from 'react-dom/client';
import Ml from '@/components/disc_system/Ml';

const useComponentsRenderer = () => {
  const renderComponents = (lop) => {
    let alphas = document.querySelectorAll('[component]');
    alphas.forEach((v) => {
      if (!v._reactRoot) v._reactRoot = createRoot(v);

      if (v.getAttribute('component') === 'my-react-component') {
        v._reactRoot.render(
          <div style={{ color: v.dataset.color }}>
            {v.innerHTML}
          </div>
        );
      } else if (v.getAttribute('component') === 'Ml') {
        v._reactRoot.render(
          <Ml
            singleton={{
              id: v.dataset.id,
              alias: v.dataset.alias,
              m: v.dataset.m,
              l: v.dataset.l,
              style: (v.dataset.style) ? { color: 'red', backgroundColor: 'black' } : {},
            }}
          />
        );
      } else {
        v._reactRoot.render(
          <div style={{ color: 'white', backgroundColor: v.dataset.color }}>
            {v.innerHTML}
          </div>
        );
      }
    });
  };
  return { renderComponents };
};
export default useComponentsRenderer;
