// components/DayCard.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, Trash2, Edit3, Calendar } from 'lucide-react';

const DayCard = ({ dayIndex, date, aiHeading, onHeadingChange }) => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [isEditingHeading, setIsEditingHeading] = useState(false);

    // Add a new todo item
    const addTask = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
        setNewTask("");
    };

    // Toggle completion status
    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    // Remove a task
    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: dayIndex * 0.1 }}
            className="flex flex-col h-full"
        >
            {/* Date Header */}
            <div className="flex items-center gap-2 mb-2 ml-2">
                <div className="bg-sky-500/20 text-sky-300 p-1.5 rounded-md border border-sky-500/50">
                    <Calendar size={16} />
                </div>
                <div>
                    <span className="block text-xs text-sky-400 font-bold tracking-widest uppercase">Day {dayIndex + 1}</span>
                    <span className="block text-sm text-slate-300 font-hand">{date}</span>
                </div>
            </div>

            {/* The Sketchy Box */}
            <div className="sketch-border bg-slate-900/40 backdrop-blur-sm p-4 flex-grow flex flex-col relative group min-h-[320px] transition-colors hover:bg-slate-900/60">
                
                {/* AI Heading Area */}
                <div className="mb-6 relative border-b-2 border-slate-700/50 pb-4 border-dashed">
                    {isEditingHeading ? (
                        <textarea
                            autoFocus
                            value={aiHeading}
                            onChange={(e) => onHeadingChange(e.target.value)}
                            onBlur={() => setIsEditingHeading(false)}
                            className="w-full bg-slate-800 rounded p-2 text-xl text-sky-300 font-hand outline-none resize-none"
                            rows={2}
                        />
                    ) : (
                        <h3 
                            onClick={() => setIsEditingHeading(true)}
                            className="text-2xl text-sky-300 font-hand cursor-pointer hover:text-sky-200 leading-6"
                        >
                            {aiHeading}
                        </h3>
                    )}
                    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit3 size={14} className="text-slate-500" />
                    </div>
                </div>

                {/* To-Do List Area */}
                <div className="flex-grow flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
                    <AnimatePresence>
                        {tasks.map((task) => (
                            <motion.div 
                                key={task.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex items-start gap-3 group/task"
                            >
                                <button 
                                    onClick={() => toggleTask(task.id)}
                                    className={`mt-1 min-w-[20px] h-[20px] rounded border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-lime-500 border-lime-500' : 'border-slate-500 hover:border-sky-400'}`}
                                >
                                    {task.completed && <Check size={14} className="text-black stroke-[3]" />}
                                </button>
                                <span className={`font-hand text-lg leading-6 flex-grow transition-all ${task.completed ? 'text-slate-600 line-through decoration-2' : 'text-slate-200'}`}>
                                    {task.text}
                                </span>
                                <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover/task:opacity-100 text-slate-600 hover:text-red-400 transition-opacity">
                                    <Trash2 size={14} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    
                    {tasks.length === 0 && (
                        <div className="text-center text-slate-600 font-hand text-lg mt-4 italic opacity-50">
                            No tasks yet. Add one below!
                        </div>
                    )}
                </div>

                {/* Add Task Input */}
                <form onSubmit={addTask} className="mt-4 flex items-center gap-2 border-t border-slate-700/50 pt-3">
                    <input 
                        type="text" 
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add checklist item..."
                        className="bg-transparent text-slate-300 font-hand text-lg w-full outline-none placeholder:text-slate-600"
                    />
                    <button type="submit" disabled={!newTask.trim()} className="text-sky-500 hover:text-sky-300 disabled:opacity-30">
                        <Plus size={20} />
                    </button>
                </form>

            </div>
        </motion.div>
    );
};

export default DayCard;