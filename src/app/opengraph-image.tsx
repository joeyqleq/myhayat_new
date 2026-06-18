import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'My Hayat - AI Mental Health Companion'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: '#251320', // Dark warm background
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFF9FC', // Offwhite text
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: -50, right: -50, opacity: 0.1, fontSize: 400 }}>✦</div>
        <div style={{ position: 'absolute', bottom: -50, left: -50, opacity: 0.1, fontSize: 400 }}>✧</div>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
          <img 
            src="https://myhayat.app/Watermelon.png" 
            alt="Watermelon" 
            width={120} 
            height={120} 
            style={{ marginRight: 30 }}
          />
          <span style={{ fontSize: 96, fontWeight: 900, color: '#F85BAA' }}>
            My Hayat
          </span>
        </div>
        
        <p style={{ fontSize: 48, color: '#F98181', maxWidth: '800px', textAlign: 'center', margin: 0 }}>
          Your AI Mental Health Companion
        </p>
        <p style={{ fontSize: 32, color: '#FEC810', maxWidth: '600px', textAlign: 'center', marginTop: 20 }}>
          Available 24/7 in Lebanese Arabic
        </p>
      </div>
    ),
    {
      ...size,
    }
  )
}
