$('#example1').typeIt({
     speed: 100,
     autoStart: false,
     loop: true,
     loopDelay: 1000
})
.tiType('1. Сходить в Эрмитаж ночью.')
.tiBreak() .tiPause(750)
.tiType('2. Найти экскурсовода со знанием итальянского и корейского')
.tiBreak() .tiPause(750)
.tiPause(750)
.tiType('3. Захватить Северную Кор')
.tiPause(500) .tiDelete(12)
.tiType('с собой путеводитель.');
