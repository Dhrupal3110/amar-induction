"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { updateFounderSettings, updateStatsSettings } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

export default function SettingsPage() {
    const { toast } = useToast();

    // Founder State
    const [founderData, setFounderData] = useState({
        name: "",
        role: "",
        quote: "",
        bio: "",
        image: "",
    });

    // Stats State
    const [stats, setStats] = useState<{ label: string; value: number | string; suffix: string }[]>([]);

    useEffect(() => {
        // Fetch Founder Data
        const founderUnsub = onSnapshot(doc(db, "settings", "founder"), (doc) => {
            if (doc.exists()) {
                setFounderData(doc.data() as any);
            }
        });

        // Fetch Stats Data
        const statsUnsub = onSnapshot(doc(db, "settings", "stats"), (doc) => {
            if (doc.exists()) {
                setStats(doc.data().items || []);
            }
        });

        return () => {
            founderUnsub();
            statsUnsub();
        };
    }, []);

    const handleFounderSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateFounderSettings(founderData);
            toast({ title: "Success", description: "Founder profile updated" });
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to update founder" });
        }
    };

    const handleStatsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Ensure numbers are stored, defaulting to 0 if empty
            const cleanStats = stats.map(s => ({
                ...s,
                value: s.value === "" ? 0 : Number(s.value)
            }));
            await updateStatsSettings(cleanStats);
            toast({ title: "Success", description: "Statistics updated" });
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to update stats" });
        }
    };

    const addStat = () => {
        setStats([...stats, { label: "New Stat", value: 0, suffix: "+" }]);
    };

    const removeStat = (index: number) => {
        const newStats = [...stats];
        newStats.splice(index, 1);
        setStats(newStats);
    };

    const updateStat = (index: number, key: string, value: any) => {
        const newStats = [...stats];
        (newStats[index] as any)[key] = value;
        setStats(newStats);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Site Content Settings</h2>

            <Tabs defaultValue="founder" className="w-full">
                <TabsList className="bg-neutral-900 border border-neutral-800">
                    <TabsTrigger value="founder">Founder Profile</TabsTrigger>
                    <TabsTrigger value="stats">Statistics</TabsTrigger>
                </TabsList>

                {/* Founder Tab */}
                <TabsContent value="founder">
                    <Card className="bg-neutral-900 border-neutral-800 text-white">
                        <CardHeader>
                            <CardTitle>Founder Information</CardTitle>
                            <CardDescription>Update the details displayed in the "Message from Leadership" section.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleFounderSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Name</label>
                                        <Input
                                            value={founderData.name}
                                            onChange={(e) => setFounderData({ ...founderData, name: e.target.value })}
                                            className="bg-neutral-800 border-neutral-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Role</label>
                                        <Input
                                            value={founderData.role}
                                            onChange={(e) => setFounderData({ ...founderData, role: e.target.value })}
                                            className="bg-neutral-800 border-neutral-700"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Image URL</label>
                                    <Input
                                        value={founderData.image}
                                        onChange={(e) => setFounderData({ ...founderData, image: e.target.value })}
                                        placeholder="/placeholder/founder.jpg"
                                        className="bg-neutral-800 border-neutral-700"
                                    />
                                    <p className="text-xs text-neutral-500">Enter a URL for the founder's image.</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Quote</label>
                                    <Textarea
                                        value={founderData.quote}
                                        onChange={(e) => setFounderData({ ...founderData, quote: e.target.value })}
                                        className="bg-neutral-800 border-neutral-700 min-h-[100px]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Biography</label>
                                    <Textarea
                                        value={founderData.bio}
                                        onChange={(e) => setFounderData({ ...founderData, bio: e.target.value })}
                                        className="bg-neutral-800 border-neutral-700 min-h-[150px]"
                                    />
                                </div>

                                <Button type="submit">Save Changes</Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Stats Tab */}
                <TabsContent value="stats">
                    <Card className="bg-neutral-900 border-neutral-800 text-white">
                        <CardHeader>
                            <CardTitle>Company Statistics</CardTitle>
                            <CardDescription>Manage the numbers shown in the Stats section.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleStatsSubmit} className="space-y-6">
                                {stats.map((stat, index) => (
                                    <div key={index} className="flex flex-col md:flex-row gap-4 items-end p-4 border border-neutral-800 rounded-lg bg-neutral-950/50">
                                        <div className="flex-1 space-y-2 w-full">
                                            <label className="text-xs text-neutral-400">Label</label>
                                            <Input
                                                value={stat.label}
                                                onChange={(e) => updateStat(index, "label", e.target.value)}
                                                className="bg-neutral-800 border-neutral-700"
                                            />
                                        </div>
                                        <div className="w-full md:w-32 space-y-2">
                                            <label className="text-xs text-neutral-400">Value</label>
                                            <Input
                                                type="number"
                                                value={stat.value}
                                                onChange={(e) => updateStat(index, "value", e.target.value === "" ? "" : parseInt(e.target.value))}
                                                className="bg-neutral-800 border-neutral-700"
                                            />
                                        </div>
                                        <div className="w-full md:w-24 space-y-2">
                                            <label className="text-xs text-neutral-400">Suffix</label>
                                            <Input
                                                value={stat.suffix}
                                                onChange={(e) => updateStat(index, "suffix", e.target.value)}
                                                className="bg-neutral-800 border-neutral-700"
                                            />
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeStat(index)}
                                            className="text-red-400 hover:text-red-300 hover:bg-neutral-800"
                                        >
                                            <Trash2 size={18} />
                                        </Button>
                                    </div>
                                ))}

                                <div className="flex gap-4">
                                    <Button type="button" variant="outline" onClick={addStat} className="gap-2">
                                        <Plus size={16} /> Add Statistic
                                    </Button>
                                    <Button type="submit">Save Changes</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
