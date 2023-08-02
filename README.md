1. 創建 Context 組件、區域

2.再 app.js 引入 並且該組件.Provider 包著所有需要的子組件

3. Provider 帶入要傳得值(通常會傳 reducer)

4. 子組件引入該組件並且使用 useContext const [state, dispatch] = useContext(CartContext)
