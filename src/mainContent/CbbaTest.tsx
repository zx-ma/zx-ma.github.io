import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Task {
  id: number;
  reward: number;
  x: number;
  y: number;
}

interface Agent {
  id: number;
  capacity: number;
  bundle: Task[];
  bids: Map<number, number>;
  x: number;
  y: number;
}

interface HistoryRecord {
  iteration: number;
  agents: Agent[];
}

const defaultTasks: Task[] = [
  { id: 0, reward: 10, x: 1, y: 2 },
  { id: 1, reward: 20, x: 3, y: 4 },
  { id: 2, reward: 15, x: 5, y: 1 },
  { id: 3, reward: 12, x: 2, y: 6 },
];

const defaultAgents: Agent[] = [
  { id: 0, capacity: 2, bundle: [], bids: new Map(), x: 0, y: 0 },
  { id: 1, capacity: 2, bundle: [], bids: new Map(), x: 3, y: 3 },
];

//CBBA functions
const evaluateTask = (agent: Agent, task: Task): number => task.reward;

const buildBids = (agents: Agent[], tasks: Task[]): Agent[] =>
  agents.map((agent) => ({
    ...agent,
    bids: new Map(
      tasks.map((t) => [t.id, evaluateTask(agent, t)] as [number, number])
    ),
  }));

const assignBundles = (agents: Agent[]): Agent[] =>
  agents.map((agent) => {
    const topIds = Array.from(agent.bids)
      .sort(([, a], [, b]) => b - a)
      .slice(0, agent.capacity)
      .map(([id]) => id);
    const bundle = defaultTasks.filter((t) => topIds.includes(t.id));
    return { ...agent, bundle };
  });

const consensus = (agents: Agent[]): Agent[] => {
  const highest = new Map<number, { agentId: number; bid: number }>();
  agents.forEach((agent) => {
    agent.bundle.forEach((task) => {
      const bid = agent.bids.get(task.id) || 0;
      const curr = highest.get(task.id);
      if (!curr || bid > curr.bid)
        highest.set(task.id, { agentId: agent.id, bid });
    });
  });
  return agents.map((agent) => ({
    ...agent,
    bundle: agent.bundle.filter(
      (task) => highest.get(task.id)!.agentId === agent.id
    ),
  }));
};

const dealLeft = (agents: Agent[], tasks: Task[]): Agent[] => {
  const taken = new Set(agents.flatMap((a) => a.bundle.map((t) => t.id)));
  return agents.map((agent) => {
    const bundle = [...agent.bundle];
    for (const [id] of Array.from(agent.bids).sort(([, a], [, b]) => b - a)) {
      if (bundle.length >= agent.capacity) break;
      if (!taken.has(id)) {
        const task = tasks.find((t) => t.id === id);
        if (task) {
          bundle.push(task);
          taken.add(id);
        }
      }
    }
    return { ...agent, bundle };
  });
};

const GRID = 10;

const CbbaDemo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [agents, setAgents] = useState<Agent[]>(defaultAgents);
  const [iter, setIter] = useState(0);
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  const [newTask, setNewTask] = useState({ reward: 0, x: 0, y: 0 });
  const [newAgent, setNewAgent] = useState({ capacity: 1, x: 0, y: 0 });
  const maxIter = 5;

  useEffect(() => {
    if (iter < 1 || iter > maxIter) return;
    const b1 = buildBids(agents, tasks);
    const b2 = assignBundles(b1);
    const b3 = consensus(b2);
    const result = dealLeft(b3, tasks);
    setAgents(result);
    setHistory((prev) => [...prev, { iteration: iter, agents: result }]);
  }, [iter]);

  const addTask = () => {
    if (
      tasks.some((t) => t.x === newTask.x && t.y === newTask.y) ||
      agents.some((a) => a.x === newTask.x && a.y === newTask.y)
    ) {
      alert("Cell occupied");
      return;
    }
    const id = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 0;
    setTasks((prev) => [...prev, { id, ...newTask }]);
  };

  const addAgent = () => {
    if (
      agents.some((a) => a.x === newAgent.x && a.y === newAgent.y) ||
      tasks.some((t) => t.x === newAgent.x && t.y === newAgent.y)
    ) {
      alert("Cell occupied");
      return;
    }
    const id = agents.length ? Math.max(...agents.map((a) => a.id)) + 1 : 0;
    setAgents((prev) => [
      ...prev,
      { id, bundle: [], bids: new Map(), ...newAgent },
    ]);
  };

  const resetAll = () => {
    setTasks([]);
    setAgents([]);
    setHistory([]);
    setIter(0);
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">CBBA Demo</h1>
      <p>
        Iteration {iter} / {maxIter}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-10 grid-rows-10 w-64 h-64 border">
        {Array.from({ length: GRID * GRID }).map((_, i) => {
          const row = Math.floor(i / GRID);
          const col = i % GRID;
          const y = GRID - 1 - row;
          const task = tasks.find((t) => t.x === col && t.y === y);
          const agentObj = agents.find((a) => a.x === col && a.y === y);
          return (
            <div key={i} className="border relative">
              <div className="absolute inset-0 flex items-center justify-center">
                {task && (
                  <div className="w-full h-full bg-red-500  text-center">
                    {task.id}
                  </div>
                )}
                {agentObj && (
                  <div className="w-11/12 h-11/12 bg-blue-500 rounded-full text-center">
                    {agentObj.id}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex space-x-8">
        <div className="w-1/2 space-y-2">
          <h2 className="text-xl">Tasks</h2>
          {tasks.map((t) => (
            <div key={t.id} className="flex justify-between">
              <span>
                #{t.id} R{t.reward} ({t.x},{t.y})
              </span>
            </div>
          ))}
          <div className="space-x-2">
            <input
              type="number"
              placeholder="R"
              value={newTask.reward}
              onChange={(e) =>
                setNewTask((mt) => ({ ...mt, reward: +e.target.value }))
              }
              className="border p-1 w-16"
            />
            <input
              type="number"
              placeholder="X"
              value={newTask.x}
              onChange={(e) =>
                setNewTask((mt) => ({ ...mt, x: +e.target.value }))
              }
              className="border p-1 w-16"
            />
            <input
              type="number"
              placeholder="Y"
              value={newTask.y}
              onChange={(e) =>
                setNewTask((mt) => ({ ...mt, y: +e.target.value }))
              }
              className="border p-1 w-16"
            />
            <Button onClick={addTask} className="bg-slate-500">
              Add Task
            </Button>
          </div>
        </div>
        <div className="w-1/2 space-y-2">
          <h2 className="text-xl">Agents</h2>
          {agents.map((a) => (
            <div key={a.id} className="flex justify-between">
              <span>
                #{a.id} C{a.capacity} ({a.x},{a.y})
              </span>
            </div>
          ))}
          <div className="space-x-2">
            <input
              type="number"
              placeholder="Cap"
              value={newAgent.capacity}
              onChange={(e) =>
                setNewAgent((ma) => ({ ...ma, capacity: +e.target.value }))
              }
              className="border p-1 w-16"
            />
            <input
              type="number"
              placeholder="X"
              value={newAgent.x}
              onChange={(e) =>
                setNewAgent((ma) => ({ ...ma, x: +e.target.value }))
              }
              className="border p-1 w-16"
            />
            <input
              type="number"
              placeholder="Y"
              value={newAgent.y}
              onChange={(e) =>
                setNewAgent((ma) => ({ ...ma, y: +e.target.value }))
              }
              className="border p-1 w-16"
            />
            <Button onClick={addAgent} className="bg-slate-500">
              Add Agent
            </Button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-4">
        <Button
          onClick={() => setIter((i) => Math.min(i + 1, maxIter))}
          className="bg-slate-800"
          disabled={iter >= maxIter}
        >
          Next Iteration
        </Button>
        <Button variant="destructive" onClick={resetAll}>
          Reset All
        </Button>
      </div>

      {/* History */}
      <div className="space-y-4">
        <h2 className="text-2xl">History</h2>
        {history.map((record) => (
          <div key={record.iteration} className="border p-2">
            <h3>Iteration {record.iteration}</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {record.agents.map((agent) => (
                <Card key={agent.id} className="p-2">
                  <CardHeader>Agent {agent.id}</CardHeader>
                  <CardContent>
                    {agent.bundle.length > 0 ? (
                      <ul>
                        {agent.bundle.map((task) => (
                          <li key={task.id}>Task {task.id}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No tasks</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CbbaDemo;
