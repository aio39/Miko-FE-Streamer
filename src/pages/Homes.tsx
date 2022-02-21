import { Outlet, useLocation, useSearchParams } from 'react-router-dom';

export default function Homes() {
  let [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();
  console.log(searchParams);
  console.log(location);
  return (
    <main style={{ padding: '1rem 0' }}>
      <h2>Home</h2>
      <Outlet />
    </main>
  );
}
