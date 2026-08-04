import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import useLocalStorage from './useLocalStorage.js'

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('initializes from the given default when storage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', ['a']))
    expect(result.current[0]).toEqual(['a'])
  })

  it('persists updates to localStorage under the given key', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', []))

    act(() => {
      result.current[1](['faroe'])
    })

    expect(result.current[0]).toEqual(['faroe'])
    expect(JSON.parse(window.localStorage.getItem('test-key'))).toEqual(['faroe'])
  })

  it('reads a previously persisted value on init', () => {
    window.localStorage.setItem('test-key', JSON.stringify(['ladakh']))
    const { result } = renderHook(() => useLocalStorage('test-key', []))
    expect(result.current[0]).toEqual(['ladakh'])
  })

  it('falls back to the initial value when stored JSON is corrupt', () => {
    window.localStorage.setItem('test-key', '{not valid json')
    const { result } = renderHook(() => useLocalStorage('test-key', ['fallback']))
    expect(result.current[0]).toEqual(['fallback'])
  })
})
