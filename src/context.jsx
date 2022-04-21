import { createContext, useReducer } from 'react'

const defaultState = {
  user: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload }
    default:
      throw Error('Unknown action in context reducer.')
  }
}

const Context = createContext({ context: defaultState, dispatch: () => null })

const ContextProvider = ({ children }) => {
  const [context, dispatch] = useReducer(reducer, defaultState)
  return (
    <Context.Provider value={{ context, dispatch }}>
      {children}
    </Context.Provider>
  )
}

export { Context, ContextProvider }

