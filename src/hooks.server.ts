// import type { Handle } from '@sveltejs/kit';
// import { BASIC_AUTH_USER, BASIC_AUTH_PASS } from '$env/static/private';

// const USER = BASIC_AUTH_USER;
// const PASS = BASIC_AUTH_PASS;

// export const handle: Handle = async ({ event, resolve }) => {
// 	if (USER && PASS) {
// 		const auth = event.request.headers.get('Authorization');
// 		if (!auth || !auth.startsWith('Basic ')) {
// 			return new Response('Unauthorized', {
// 				status: 401,
// 				headers: { 'WWW-Authenticate': 'Basic realm="Longlian Check"' }
// 			});
// 		}

// 		const decoded = atob(auth.slice(6));
// 		const [user, pass] = decoded.split(':');
// 		if (user !== USER || pass !== PASS) {
// 			return new Response('Unauthorized', {
// 				status: 401,
// 				headers: { 'WWW-Authenticate': 'Basic realm="Longlian Check"' }
// 			});
// 		}
// 	}

// 	return resolve(event);
// };
