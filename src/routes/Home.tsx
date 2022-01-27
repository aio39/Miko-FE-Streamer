import { useParams } from 'react-router-dom';

export default function Home() {
  let params = useParams();
  return (
    <main style={{ padding: '1rem 0' }}>
      <h3>{params.homeId}</h3>
    </main>
  );
}
