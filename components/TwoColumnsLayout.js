export default function TwoColumnsLayout({ children }) {

  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{width: '24%'}}>{children[0]}</div>
        <div style={{width: '76%'}}>{children[1]}</div>
    </div>
  )
}
