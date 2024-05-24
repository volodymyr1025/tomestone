import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setContainerWidth } from '../features/containerWidthSlice';

const useContainerWidth = () => {
  const dispatch = useDispatch();
  const containerWidth = useSelector((state: RootState) => state.containerWidth.width);

  const updateContainerWidth = () => {
    if (window.innerWidth < 600) {
      dispatch(setContainerWidth(300)); // sx
    } else if (window.innerWidth >= 600 && window.innerWidth < 1200) {
      dispatch(setContainerWidth(512)); // md
    } else {
      dispatch(setContainerWidth(512)); // lg
    }
  };

  useEffect(() => {
    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);
    return () => {
      window.removeEventListener('resize', updateContainerWidth);
    };
  }, [dispatch]);

  return containerWidth;
};

export default useContainerWidth;
