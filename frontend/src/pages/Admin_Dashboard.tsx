import React, { useEffect, useState } from "react";
import API from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";

const AdminDashboard = () => {
  // State for data
  const [shops, setShops] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [ads, setAds] = useState<any[]>([]);
  // State for modals/forms
  const [showShopModal, setShowShopModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [form, setForm] = useState<any>({});

  // Fetch data
  useEffect(() => {
    API.get("/api/shops/").then(res => setShops(res.data));
    API.get("/api/events/").then(res => setEvents(res.data));
    API.get("/api/ads/").then(res => setAds(res.data));
  }, []);

  // Helpers
  const openModal = (type: string, item: any = null) => {
    setEditItem(item);
    setForm(item || {});
    if (type === "shop") setShowShopModal(true);
    if (type === "event") setShowEventModal(true);
    if (type === "ad") setShowAdModal(true);
  };
  const closeModal = () => {
    setShowShopModal(false);
    setShowEventModal(false);
    setShowAdModal(false);
    setEditItem(null);
    setForm({});
  };

  // CRUD handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Shop
  const handleShopSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      const res = await API.put(`/api/shops/${editItem.id}/`, form);
      setShops(shops.map(s => (s.id === editItem.id ? res.data : s)));
    } else {
      const res = await API.post("/api/shops/", form);
      setShops([...shops, res.data]);
    }
    closeModal();
  };
  const handleShopDelete = async (id: number) => {
    await API.delete(`/api/shops/${id}/`);
    setShops(shops.filter(s => s.id !== id));
  };

  // Event
  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      const res = await API.put(`/api/events/${editItem.id}/`, form);
      setEvents(events.map(ev => (ev.id === editItem.id ? res.data : ev)));
    } else {
      const res = await API.post("/api/events/", form);
      setEvents([...events, res.data]);
    }
    closeModal();
  };
  const handleEventDelete = async (id: number) => {
    await API.delete(`/api/events/${id}/`);
    setEvents(events.filter(ev => ev.id !== id));
  };

  // Ad
  const handleAdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // For file upload, use FormData
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    let res;
    if (editItem) {
      res = await API.put(`/api/ads/${editItem.id}/`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      setAds(ads.map(ad => (ad.id === editItem.id ? res.data : ad)));
    } else {
      res = await API.post("/api/ads/", formData, { headers: { "Content-Type": "multipart/form-data" } });
      setAds([...ads, res.data]);
    }
    closeModal();
  };
  const handleAdDelete = async (id: number) => {
    await API.delete(`/api/ads/${id}/`);
    setAds(ads.filter(ad => ad.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Shops */}
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Shops
                <Button size="sm" onClick={() => openModal("shop")}>+ Add</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {shops.map(shop => (
                  <li key={shop.id} className="flex justify-between items-center border-b py-2">
                    <div>
                      <b>{shop.name}</b> <span className="text-xs text-gray-500">({shop.location})</span>
                    </div>
                    <div>
                      <Button size="sm" variant="outline" onClick={() => openModal("shop", shop)}>Edit</Button>
                      <Button size="sm" variant="destructive" className="ml-2" onClick={() => handleShopDelete(shop.id)}>Delete</Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          {/* Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Events
                <Button size="sm" onClick={() => openModal("event")}>+ Add</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {events.map(event => (
                  <li key={event.id} className="flex justify-between items-center border-b py-2">
                    <div>
                      <b>{event.title}</b> <span className="text-xs text-gray-500">({event.date})</span>
                    </div>
                    <div>
                      <Button size="sm" variant="outline" onClick={() => openModal("event", event)}>Edit</Button>
                      <Button size="sm" variant="destructive" className="ml-2" onClick={() => handleEventDelete(event.id)}>Delete</Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          {/* Ads */}
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Advertisements
                <Button size="sm" onClick={() => openModal("ad")}>+ Add</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {ads.map(ad => (
                  <li key={ad.id} className="flex justify-between items-center border-b py-2">
                    <div>
                      <b>{ad.title}</b>
                      {ad.image && <img src={ad.image} alt={ad.title} className="h-8 inline ml-2" />}
                      {ad.video && <video src={ad.video} className="h-8 inline ml-2" controls />}
                    </div>
                    <div>
                      <Button size="sm" variant="outline" onClick={() => openModal("ad", ad)}>Edit</Button>
                      <Button size="sm" variant="destructive" className="ml-2" onClick={() => handleAdDelete(ad.id)}>Delete</Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Modals */}
        {(showShopModal || showEventModal || showAdModal) && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {showShopModal && (editItem ? "Edit Shop" : "Add Shop")}
                {showEventModal && (editItem ? "Edit Event" : "Add Event")}
                {showAdModal && (editItem ? "Edit Advertisement" : "Add Advertisement")}
              </h2>
              <form
                onSubmit={
                  showShopModal
                    ? handleShopSubmit
                    : showEventModal
                    ? handleEventSubmit
                    : handleAdSubmit
                }
                className="space-y-4"
              >
                {/* Shop Form */}
                {showShopModal && (
                  <>
                    <Label>Name</Label>
                    <Input name="name" value={form.name || ""} onChange={handleChange} required />
                    <Label>Location</Label>
                    <Input name="location" value={form.location || ""} onChange={handleChange} required />
                    <Label>Phone</Label>
                    <Input name="phone" value={form.phone || ""} onChange={handleChange} />
                  </>
                )}
                {/* Event Form */}
                {showEventModal && (
                  <>
                    <Label>Title</Label>
                    <Input name="title" value={form.title || ""} onChange={handleChange} required />
                    <Label>Date</Label>
                    <Input name="date" type="date" value={form.date || ""} onChange={handleChange} required />
                    <Label>Description</Label>
                    <Input name="description" value={form.description || ""} onChange={handleChange} />
                  </>
                )}
                {/* Ad Form */}
                {showAdModal && (
                  <>
                    <Label>Title</Label>
                    <Input name="title" value={form.title || ""} onChange={handleChange} required />
                    <Label>Image</Label>
                    <Input name="image" type="file" accept="image/*" onChange={e => setForm({ ...form, image: e.target.files?.[0] })} />
                    <Label>Video</Label>
                    <Input name="video" type="file" accept="video/*" onChange={e => setForm({ ...form, video: e.target.files?.[0] })} />
                    <Label>Link</Label>
                    <Input name="link" value={form.link || ""} onChange={handleChange} />
                  </>
                )}
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
                  <Button type="submit">{editItem ? "Update" : "Add"}</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;