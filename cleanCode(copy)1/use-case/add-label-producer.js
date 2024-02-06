
module.exports = function makeAddLabelskafka({ kafka }) {
  return async function addlabelKafka({ id }) {
    const producer = kafka.producer();
    await producer.connect();
    // console.log(id,"id controller");
    await producer.send({
      topic: "gmail-labels",
      messages: [{ value: id }],
    });
  };
};

