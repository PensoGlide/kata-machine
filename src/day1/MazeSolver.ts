const dir = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
]

function walkSol(maze: string[], wall: string, current: Point, end: Point, seen: boolean[][], path: Point[]): boolean {

    // Off the map
    if (current.x < 0 || current.x >= maze[0].length ||
        current.y < 0 || current.y >= maze.length)
    {
        return false;
    }

    // On a wall
    if (maze[current.y][current.x] === wall) {
        return false;
    }

    // End
    if (current.x === end.x && current.y === end.y) {
        path.push(current);
        return true;
    }

    // Has been seen
    if (seen[current.y][current.x]) {
        return false;
    }

    // Steps to recursion:
    // Base cases (conditions)
    // pre (in this case is creating a path)
    // recurse
    // post

    // Pre
    seen[current.y][current.x] = true;
    path.push(current);

    // Recurse
    for (let i = 0; i < dir.length; ++i) {
        const [x, y] = dir[i]
        if (walkSol(maze, wall, {
            x: current.x + x,
            y: current.y + y
        }, end, seen, path) === true) {
            return true;
        }
    }

    // Post
    path.pop()

    return false;
}


function walk(maze: string[], wall: string, current: Point, end: Point, path: Point[]): Point[] {
    const x: number = current.x;
    const y: number = current.y;

    const newMaze = maze.map((row, i) => {
        if (i === y) {
            const rowArray = row.split('');
            rowArray[x] = 'P';
            return rowArray.join('');
        } else {
            return row;
        }
    });
    console.log(newMaze);

    const points: Point[] = [
        {'x': x, 'y': y + 1},
        {'x': x, 'y': y - 1},
        {'x': x - 1, 'y': y},
        {'x': x + 1, 'y': y},
    ];

    let point: Point;
    for (point of points) {
        //console.log(point)
        let pointX: number = point.x;
        let pointY: number = point.y;
        //console.log('x ', pointX)
        //console.log('y ', pointY)
        
        // It's out of the map
        if (pointX < 0 || pointY < 0 || pointX > maze[pointY].length - 1 ||  pointY > maze.length - 1) {
            continue;
        }
        // It's a wall
        const row = maze[pointY].split('');
        const isWall = row[pointX] === wall;
        if (isWall) {
            continue;
        }
        // It's the end
        if (point === end) {
            console.log('Point X: ', point.x);
            console.log('Point Y: ', point.y);
            console.log('End X: ', end.x);
            console.log('End Y: ', end.y);
            path.push(point)
            return path;
        }
        // Have seen it
        if (path.includes(point)) {
            continue;
        }

        // Recurse
        path.push(point!);
        walk(maze, wall, point!, end, path);
    }

    return path;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
    const path: Point[] = [start];
    const seen: boolean[][] = [];

    for (let i = 0; i < maze.length; ++i) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    const answer = walkSol(maze, wall, start, end, seen, path);

    return path;
}