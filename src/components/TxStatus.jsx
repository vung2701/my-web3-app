function TxStatus({ txHash }) {
  if (!txHash) return null

  return (
    <div className="txStatus">
      <p>
        Tx Hash:{' '}
        <a
          href={`https://sepolia.etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noreferrer"
        >
          {txHash}
        </a>
      </p>
    </div>
  )
}

export default TxStatus
