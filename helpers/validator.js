module.exports = {
  validate(object, rules) {
    const errors = rules.reduce((errs, rule) => {
      const result = rule.test(object);
      if (result === false) {
        errs.push(rule.message);
      }
      return errs;
    }, []);

    return {
      success: errors.length === 0,
      message: errors,
      data: null,
    };
  },

  isPk(data) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(data);
  },

  isEmail(data) {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data);
  },

  isPassword(data) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(data);
  },
};
