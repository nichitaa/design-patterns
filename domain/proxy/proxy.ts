namespace ProxyPattern {

    export interface IService {
        getUserData(params?: any): void;
    }

    /***
     * Real subject (service) the proxy will redirect to
     * */
    export class SensitiveUserService implements IService {
        getUserData() {
            return {'username': 'nichitaa', 'password': 'strongPassword', 'university': 'UTM'};
        }
    }

    /***
     * Proxy with simple auth / load balance / caching
     * */
    export class Proxy implements IService {
        private readonly proxyName: string;
        private userService: SensitiveUserService;
        private limit: number; // max number of requests
        private cachedData: any;

        constructor(name: string) {
            this.proxyName = name;
            this.userService = new SensitiveUserService();
            this.limit = 2;
            this.cachedData = null;
        }

        getUserData(authToken: string) {
            if (this.checkAuth(authToken)) {
                if (this.loadBalance()) {
                    if (this.cache()) {
                        // all checks have passed, do redirect to the real service
                        this.cachedData = this.userService.getUserData();
                        return this.cachedData;
                    } else {
                        return this.cachedData;
                    }
                } else {
                    return `[${this.proxyName}] No more available requests`;
                }
            } else {
                return `[${this.proxyName}] Not Authorized`;
            }
        }

        cache() {
            return !this.cachedData;
        }

        loadBalance() {
            if (this.limit === 0) return false;
            else {
                this.limit--;
                return true;
            }
        }

        checkAuth(token: string) {
            return token === 'securedToken';
        }
    }
}