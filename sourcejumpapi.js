const rp = require('request-promise');
const config = require("./jsons/configs.json")
api_key = config.sjapikey
steam_api = config.steamapikey
steam_base_api = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="
steam_id_url = "&steamids="
base_api = "https://sourcejump.net/api/"
wr_api_url = `${base_api}` + "records/"
player_api_url = `${base_api} + "players/"`

function get_wr(map) {
    wr_url = `${wr_api_url}${map}?key=${api_key}`
    return rp(wr_url).then(body => {
        try {
            obj = JSON.parse(body)
            return obj;
        } catch {
            return []
        }
    });
}

function get_avatar(steamid) {
    steam_url = `${steam_base_api}${steam_api}${steam_id_url}${steamid}`
    return rp(steam_url).then(body => {
        try {
            obj = JSON.parse(body)
            return obj['response']['players'][0]["avatarfull"]
        } catch {
            return []
        }
    });
}

module.exports = {
    get_wr,
    get_avatar
}