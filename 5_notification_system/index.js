module.exports = {

    notification_system: {},

    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
      if (!this.notification_system.hasOwnProperty(event)){
        this.notification_system[event] = [];
      }
      this.notification_system[event].push({
        handler: handler.bind(subscriber),
        subscriber: subscriber
      });
      // console.log(this.notification_system[event], event);
      return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
      if(!this.notification_system.hasOwnProperty(event)) return this;
      let event_notifiers = this.notification_system[event];
      for (let i = event_notifiers.length - 1; i >= 0; --i) {
        if (event_notifiers[i].subscriber === subscriber) {
          // console.log()
          // console.log("off", this.notification_system[event], event);
          this.notification_system[event].splice(i, 1);
          // console.log("after off", this.notification_system[event], event);
        }
      }
      return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
      if(this.notification_system[event] === undefined) return this;
      let to_notify = this.notification_system[event];
      for (let i = 0; i < to_notify.length; ++i) {
        // console.log(to_notify[i]);
        to_notify[i].handler();
      }
      return this;
    }
};
