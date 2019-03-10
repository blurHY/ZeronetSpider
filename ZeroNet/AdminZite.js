const Zite = require("./Zite")
const log = require("../Logger")

module.exports = class AdminZite extends Zite {
    constructor() {
        super("1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D")
        this.siteList = []
    }

    async reloadSiteList() {
        log("info", "zeronet", "Reloading sites list")
        this.siteList = await this.cmdp("siteList")
    }

    async updateAll() {
        log("info", "zeronet", "Updating all sites")
        await this.reloadSiteList()
        for (let site of this.siteList)
            this.cmdp("siteUpdate", site.address).then(res => log("info", "spider", `${res}: ${site.address}`))
    }

    addSites(siteAddrs) {
        let count = siteAddrs.length
        log("info", "zeronet", `Adding ${count} sites to zeronet`)
        for (let addr of siteAddrs)
            this.cmdp("siteAdd", addr)
    }
}
