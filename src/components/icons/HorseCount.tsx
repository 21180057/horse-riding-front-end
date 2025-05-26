import HorseIcon from '../../assets/horse2.svg'

export default function HorseCount({ count }: { count: number }) {
  return (
    <div style={{ textAlign: 'center', width: '120px' }}>
      <img
        src={HorseIcon}
        alt="Horse Icon"
        style={{ height: '50px', width: '50px', opacity: 0.9 }}
      />
      <p style={{ fontSize: '1.2rem', fontWeight: '600', color: '#5a3e2b', margin: '0' }}>
        {count}
      </p>
      <p style={{ fontSize: '1.2rem', fontWeight: '600', color: '#5a3e2b', margin: '0' }}>
        Коне
      </p>
    </div>
  )

}
