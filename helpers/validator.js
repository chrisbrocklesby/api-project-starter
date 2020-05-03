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
};
