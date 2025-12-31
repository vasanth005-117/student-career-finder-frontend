// Simple gradient backgrounds

export function ParticleBackground() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)'
    }} />
  );
}

export function LoginBackground() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)'
    }} />
  );
}

export function DashboardBackground() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      background: 'linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0369a1 100%)'
    }} />
  );
}

export default ParticleBackground;
