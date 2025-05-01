function TokenSelector({ tokens, token, setToken }) {
  return (
    <div>
      <label className="block mb-1">Chọn token:</label>
      <select
        className="border p-2 rounded w-full"
        value={token.address}
        onChange={(e) =>
          setToken(tokens.find((t) => t.address === e.target.value))
        }
      >
        {tokens.map((t) => (
          <option value={t.address} key={t.address}>
            {t.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default TokenSelector
