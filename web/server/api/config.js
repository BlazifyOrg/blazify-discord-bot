const Route = require("../lib/Route");
const ConfigSettings = require("../../../src/models/configsetting");
const Prefix = require("../../../src/models/prefix");
module.exports = class extends Route {
  constructor() {
    super("/api/config/:id", "put");
  }

  async run(client, app, req, res) {
    const { id } = req.params;
    if (!id || !client.guilds.cache.has(id)) return res.json({ success: false });

    const guild = client.guilds.cache.get(id);
    const { access_token, type, locale } = req.query;

    if (!access_token || !type || !locale) return res.json({ success: false });

    const user = await client.oauth.getUser(access_token);
    if (!user || guild.members.cache.has(user))
      return res.json({ success: false });

    const member = guild.member(user.id);
    if (
      !member.hasPermission("MANAGE_GUILD", {
        checkAdmin: true,
        checkOwner: true,
      })
    )
      return res.json({ success: false });

    if (locale !== "prefix") {
      let config =
        (await ConfigSettings.findOne({ guildID: guild.id })) ||
        new ConfigSettings({
          guildID: guild.id,
        });
      config["enable" + locale] = type !== "disable";
      config.save();
      return res.json({
        success: true,
        data: { name: locale, type: config["enable" + locale] },
      });
    }

    const prefix =
      (await Prefix.findOne({ guildID: guild.id })) ||
      new Prefix({
        guildID: guild.id,
        prefix: type,
      });

    prefix.prefix = type;
    prefix.save();
    return res.json({ success: true, data: { name: locale, type } });
  }
};
