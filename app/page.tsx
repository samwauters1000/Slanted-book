"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { library } from './components/data/contentData';

const allRootItems = [
  "Communication", "Information", "Design", "The message design family", 
  "Message design principles", "Message design theories", "Message design tools", 
  "Study of message design", "Representations", "The receivers", "Refrences"
];

export default function FinderPage() {
  const [columns, setColumns] = useState<any[]>([allRootItems]);
  const [activeItems, setActiveItems] = useState<string[]>([]);
  
  const [settings, setSettings] = useState({
    // Achtergrond gradiënt instelling (als string om in style object te gebruiken)
    bgGradient: 'linear-gradient(135deg, #0d090b 0%, #1a1a1a 100%)',
    textColor: '#e0e0e0',
    accentColor: '#ffffff'
  });

  const handleItemClick = (item: any, level: number) => {
    const label = typeof item === 'string' ? item : item.title;
    const newColumns = columns.slice(0, level + 1);
    const newActiveItems = activeItems.slice(0, level);
    
    if (activeItems[level] === label) {
      setColumns(newColumns);
      setActiveItems(newActiveItems);
      return;
    }

    newActiveItems[level] = label;

    if (library[item]) newColumns.push(library[item]);
    else if (typeof item !== 'string' && item.content) newColumns.push({ title: item.title, content: item.content });

    setColumns(newColumns);
    setActiveItems(newActiveItems);
  };

  return (
    <main className="h-screen w-full p-4 flex overflow-hidden font-body text-[16px]" // Tekst groter gemaakt (16px base)
      style={{ background: settings.bgGradient, color: settings.textColor }}>
      
      <div className="flex w-full h-full border border-[#292929] rounded-[8px] bg-[#0d090b]/40 backdrop-blur-sm">
        
        {/* Sidebar */}
        <div className="w-[260px] border-r border-[#292929] p-8 flex-shrink-0">
          <h2 className="font-heading font-bold text-white mb-8 text-[22px] tracking-tight">Slanted Design</h2>
          
          <div className="text-[12px] uppercase font-bold text-[#7f7f7f] mb-4 tracking-wider">Library</div>
          <div className="py-3 px-4 hover:bg-[#292929] rounded-[4px] cursor-pointer mb-8 text-[16px]" onClick={() => { setColumns([allRootItems]); setActiveItems([]); }}>★ Contents</div>

          <div className="space-y-6 border-t border-[#292929] pt-8">
            <h3 className="font-heading text-[12px] uppercase font-bold text-[#7f7f7f] tracking-wider">App Settings</h3>
            <div className="space-y-2">
              <label className="text-[12px] text-[#7f7f7f]">Active Item Color</label>
              <input type="color" className="w-full h-8 bg-transparent cursor-pointer" value={settings.accentColor} onChange={(e) => setSettings({...settings, accentColor: e.target.value})} />
            </div>
          </div>
        </div>

        {/* Kolommen */}
        <AnimatePresence initial={false}>
          {columns.map((col, index) => {
            const isLast = index === columns.length - 1;
            return (
              <motion.div 
                key={index} 
                className={`border-r border-[#292929] flex-shrink-0 ${isLast ? 'flex-1 min-w-[350px]' : 'w-[320px]'} ${isLast ? 'overflow-y-auto custom-scrollbar' : 'overflow-hidden'}`}
              >
                <ul className="py-8 px-6">
                  {Array.isArray(col) ? col.map((item, i) => {
                    const label = typeof item === 'string' ? item : item.title;
                    const isActive = activeItems[index] === label;
                    return (
                      <li key={i} onClick={() => handleItemClick(item, index)}
                        style={{ backgroundColor: isActive ? settings.accentColor : 'transparent', color: isActive ? '#000' : 'inherit' }}
                        className="px-4 py-3 cursor-default flex items-center rounded-[4px] transition-all mb-[6px] text-[16px]">
                        <span className="mr-4">📁</span>
                        <span className="truncate">{label}</span>
                      </li>
                    );
                  }) : (
                    <div className="p-8">
                      <h2 className="font-heading font-bold mb-10 text-[26px]">{col.title}</h2>
                      <div className="text-[18px] leading-relaxed whitespace-pre-wrap opacity-90">{col.content}</div>
                    </div>
                  )}
                </ul>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
      `}</style>
    </main>
  );
}