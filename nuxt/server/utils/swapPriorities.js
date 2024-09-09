export default async function (id1, id2) {
    const news1 = await Content.findOne({where: {id : id1} })
    const news2 = await Content.findOne({where: {id : id2} })
    if (!news1 || !news2) {
      throw new Error('One or both tasks not found')
    }
    if (Math.abs(news1.priority - news2.priority) !== 1) {
      throw new Error('Tasks do not have adjacent priorities');
    }

    // Swap the priorities
    if (news1.priority > news2.priority) {
      await news1.decrement('priority', { by: 1 });
      await news2.increment('priority', { by: 1 });
    } else {
      await news1.increment('priority', { by: 1 });
      await news2.decrement('priority', { by: 1 });
    }
  }