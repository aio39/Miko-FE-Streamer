import { selector } from 'recoil';

// const authState = atom<false>({
//   key: 'auth',
//   default: false,
// });

const isLoginState = selector<boolean>({
  key: 'isLogin',
  get: ({ get }) => {
    const isExistToken = document.cookie.match(
      /^(.*;)?\s*logged\s*=\s*[^;]+(.*)?$/
    );
    console.log('isExistToken', isExistToken);

    return isExistToken ? true : false;
  },
});

export { isLoginState };
