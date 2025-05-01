function TokenSelector({ tokens, token, setToken }) {
  return (
    <div>
      <label className="block mb-1">Chọn token:</label>
      <select
        className="border p-2 rounded w-full"
        value={token.name}
			  onChange={(e) =>
          setToken(tokens.find((t) => t.name == e.target.value))
        }
      >
        {tokens.map((t, index) => (
          <option value={t.name} key={index}>
            {t.name}-{index + 1} ({t.symbol})
          </option>
        ))}
      </select>
    </div>
  )
}

export default TokenSelector
