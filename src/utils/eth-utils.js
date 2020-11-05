// If connected to MetaMask returns the current account
// else return null
export const isConnected2MetaMask = async () => {
  //  If not connected accounts will be an empty array
  const accounts = await window.ethereum.request({
    method: 'eth_accounts',
  })
  if (accounts.length === 0) {
    return null
  }
  return accounts[0]
}

// send `transaction`, so ethers, from signer address
export const sendTransaction = async (signer, provider, transaction) => {
  try {
    // send the transaction and return a transaction response
    const tx = await signer.sendTransaction(transaction)
    // wait for tx.hash to be mined with 3 block validation and a timeout of 120 seconds
    // if succeed returns a receipt of the transaction
    const receipt = await provider.waitForTransaction(tx.hash, 3, 120000)
    return receipt
  } catch (e) {
    return null
  }
}
