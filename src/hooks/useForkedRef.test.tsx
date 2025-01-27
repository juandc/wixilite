import { renderHook } from '@testing-library/react-hooks';
import { describe, it, expect, vi } from 'vitest';
import { useForkRef } from './useForkedRef';

describe('useForkRef', () => {
  it('should call all provided refs', () => {
    const ref1 = vi.fn();
    const ref2 = vi.fn();
    const { result } = renderHook(() => useForkRef(ref1, ref2));

    const element = document.createElement('div');
    result.current?.(element);

    expect(ref1).toHaveBeenCalledWith(element);
    expect(ref2).toHaveBeenCalledWith(element);
  });

  it('should handle null and undefined refs', () => {
    const ref1 = vi.fn();
    const { result } = renderHook(() => useForkRef(ref1, null, undefined));

    const element = document.createElement('div');
    result.current?.(element);

    expect(ref1).toHaveBeenCalledWith(element);
  });
});
