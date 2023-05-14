// src/momentum.ts

interface MomentumOptions {
    url: string;
    apikey: string;
}

type UserKey = "username" | "accountId" | "email" | "discordId";

class Momentum {
    private url: string;
    private apikey: string;

    constructor(options: MomentumOptions) {
        this.url = options.url;
        validateApiKey(options.apikey);
        this.apikey = options.apikey;
        if (!this.url) {
            throw new Error('MomentumOptions.url is required');
        }
        if (!this.apikey) {
            throw new Error('MomentumOptions.apikey is required');
        }
    }

    public async getUser(key: UserKey, value: string) {

        try {
            await fetch(this.url + "/user/" + key + "/" + value, {
                method: "GET",
                headers: {
                    "x-api-key": this.apikey,
                }
            })
                .then((response: Response) => {
                    return response.json();
                });
        } catch (error: any) {
            throw new Error(error);
        }

    }

    public async updateUser(key: UserKey, value: string, field: string, newValue: string) {

        try {
            await fetch(this.url + "/user/" + key + "/" + value, {
                method: "POST",
                headers: {
                    "x-api-key": this.apikey,
                },
                body: JSON.stringify({
                    fieldToUpdate: field,
                    newValue: newValue
                })
            })
                .then((response: Response) => {
                    return response.json();
                });
        } catch (error: any) {
            throw new Error(error);
        }

    }

    public async getProfile(accountId: string, value: string) {

        try {
            await fetch(this.url + "/profile/accountId/" + accountId + "/" + value, {
                method: "GET",
                headers: {
                    "x-api-key": this.apikey,
                }
            })
                .then((response: Response) => {
                    return response.json();
                });
        } catch (error: any) {
            throw new Error(error);
        }

    }

}

function isApiKey(value: string): value is string & { length: 32 } {
    return value.length === 32;
}

function validateApiKey(apikey: string): void {
    if (!isApiKey(apikey)) {
        throw new Error("Invalid API key. Please provide an API key that is exactly 32 characters long.");
    }
}

export default Momentum;
