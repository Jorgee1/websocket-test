type Controller = {
    up: boolean,
    down: boolean,
    left: boolean,
    right: boolean
}

type Square = {
    x: number
    y: number
    w: number
    h: number
}

type Movement = {
    x: number
    y: number
}

const clearScreen = (context: CanvasRenderingContext2D, clearColor: string) => {
    context.fillStyle = clearColor
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
}

const drawSquare = (context: CanvasRenderingContext2D, square: Square, color: string) => {
    context.fillStyle = color
    context.fillRect(square.x, square.y, square.w, square.h)
}

const updateControllerMovement = (controller: Controller, movement: Movement) => {
    if (controller.up) movement.y = -1
    else if (controller.down) movement.y = 1
    else if (!controller.up && !controller.down) movement.y = 0

    if (controller.left) movement.x = -1
    else if (controller.right) movement.x = 1
    else if (!controller.left && !controller.right) movement.x = 0
}

const controllerEventListener = (controller: Controller) => {
    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') controller.down = true
        else if (event.key === 'ArrowUp') controller.up = true
        else if (event.key === 'ArrowLeft') controller.left = true
        else if (event.key === 'ArrowRight') controller.right = true
    })

    window.addEventListener('keyup', (event) => {
        if (event.key === 'ArrowDown') controller.down = false
        else if (event.key === 'ArrowUp') controller.up = false
        else if (event.key === 'ArrowLeft') controller.left = false
        else if (event.key === 'ArrowRight') controller.right = false
    })
}

const init = () => {
    const width = 800
    const height = 400
    const clearColor = 'white'

    const header = document.createElement('h1')
    header.textContent = 'WebSocket Test'
    document.body.append(header)
    
    
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    document.body.append(canvas)


    const context = canvas.getContext('2d')
    if (!context) throw Error('Canvas not available')

    const square: Square = {x: 0, y:0, w:50, h:50}

    const controller: Controller = {
        up: false,
        down: false,
        left: false,
        right: false
    }
    const movement: Movement = {x: 0, y:0}
    const speed = 5

    const squaresToRender: Square[] = [
        square,
        {
            x: 100,
            y: 100,
            w: 20,
            h: 60
        }
    ]

    controllerEventListener(controller)

    const gameLoop = () => {
        clearScreen(context, clearColor)
        updateControllerMovement(controller, movement)


        square.x += movement.x * speed
        square.y += movement.y * speed

        for (const square of squaresToRender) {
            drawSquare(context, square, 'red')
        }

        window.requestAnimationFrame(gameLoop)
    }

    window.requestAnimationFrame(gameLoop)
}



init()