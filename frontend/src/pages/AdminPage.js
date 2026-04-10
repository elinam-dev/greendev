import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Buildings, 
  Envelope,
  Quotes,
  SignOut,
  Plus,
  Trash,
  PencilSimple,
  Check,
  X
} from '@phosphor-icons/react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminPage = () => {
  const { user, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('submissions');
  const [submissions, setSubmissions] = useState([]);
  const [projects, setProjects] = useState([]);
  const [team, setTeam] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Form states
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [projectForm, setProjectForm] = useState({
    client_name: '',
    project_type: '',
    location: '',
    summary: '',
    year: new Date().getFullYear(),
    industry: '',
    featured: false
  });

  const [teamForm, setTeamForm] = useState({
    name: '',
    role: '',
    expertise: '',
    bio: '',
    image_url: '',
    order: 0
  });

  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    role: '',
    company: '',
    content: ''
  });

  useEffect(() => {
    if (user) {
      fetchAllData();
    }
  }, [user]);

  const fetchAllData = async () => {
    setDataLoading(true);
    try {
      const [subsRes, projRes, teamRes, testRes] = await Promise.all([
        axios.get(`${API_URL}/api/admin/contact-submissions`, { withCredentials: true }),
        axios.get(`${API_URL}/api/projects`),
        axios.get(`${API_URL}/api/team`),
        axios.get(`${API_URL}/api/testimonials`)
      ]);
      setSubmissions(subsRes.data);
      setProjects(projRes.data);
      setTeam(teamRes.data);
      setTestimonials(testRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  // Project handlers
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await axios.put(`${API_URL}/api/admin/projects/${editingItem.id}`, projectForm, { withCredentials: true });
      } else {
        await axios.post(`${API_URL}/api/admin/projects`, projectForm, { withCredentials: true });
      }
      fetchAllData();
      setShowProjectForm(false);
      setEditingItem(null);
      resetProjectForm();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${API_URL}/api/admin/projects/${id}`, { withCredentials: true });
        fetchAllData();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const resetProjectForm = () => {
    setProjectForm({
      client_name: '',
      project_type: '',
      location: '',
      summary: '',
      year: new Date().getFullYear(),
      industry: '',
      featured: false
    });
  };

  // Team handlers
  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await axios.put(`${API_URL}/api/admin/team/${editingItem.id}`, teamForm, { withCredentials: true });
      } else {
        await axios.post(`${API_URL}/api/admin/team`, teamForm, { withCredentials: true });
      }
      fetchAllData();
      setShowTeamForm(false);
      setEditingItem(null);
      resetTeamForm();
    } catch (error) {
      console.error('Error saving team member:', error);
    }
  };

  const handleDeleteTeam = async (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await axios.delete(`${API_URL}/api/admin/team/${id}`, { withCredentials: true });
        fetchAllData();
      } catch (error) {
        console.error('Error deleting team member:', error);
      }
    }
  };

  const resetTeamForm = () => {
    setTeamForm({
      name: '',
      role: '',
      expertise: '',
      bio: '',
      image_url: '',
      order: 0
    });
  };

  // Testimonial handlers
  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await axios.put(`${API_URL}/api/admin/testimonials/${editingItem.id}`, testimonialForm, { withCredentials: true });
      } else {
        await axios.post(`${API_URL}/api/admin/testimonials`, testimonialForm, { withCredentials: true });
      }
      fetchAllData();
      setShowTestimonialForm(false);
      setEditingItem(null);
      resetTestimonialForm();
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await axios.delete(`${API_URL}/api/admin/testimonials/${id}`, { withCredentials: true });
        fetchAllData();
      } catch (error) {
        console.error('Error deleting testimonial:', error);
      }
    }
  };

  const resetTestimonialForm = () => {
    setTestimonialForm({
      name: '',
      role: '',
      company: '',
      content: ''
    });
  };

  const handleUpdateSubmissionStatus = async (id, status) => {
    try {
      await axios.patch(`${API_URL}/api/admin/contact-submissions/${id}`, { status }, { withCredentials: true });
      fetchAllData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="spinner" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50" data-testid="admin-page">
      {/* Header */}
      <header className="bg-[#064E3B] text-white py-4 px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-outfit text-xl font-bold">GreenDev Admin</h1>
            <p className="text-white/70 text-sm">Content Management</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/70">{user.email}</span>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              data-testid="admin-logout"
            >
              <SignOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="submissions" className="flex items-center gap-2">
              <Envelope className="w-4 h-4" />
              Contact Submissions
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Buildings className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <Quotes className="w-4 h-4" />
              Testimonials
            </TabsTrigger>
          </TabsList>

          {/* Contact Submissions Tab */}
          <TabsContent value="submissions">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-outfit text-lg font-semibold">Contact Submissions</h2>
              </div>
              {dataLoading ? (
                <div className="p-8 text-center">
                  <div className="spinner mx-auto" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell className="font-medium">{sub.name}</TableCell>
                        <TableCell>{sub.email}</TableCell>
                        <TableCell>{sub.company || '-'}</TableCell>
                        <TableCell>{sub.service || '-'}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs rounded ${
                            sub.status === 'new' ? 'bg-blue-100 text-blue-700' :
                            sub.status === 'reviewed' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {sub.status}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(sub.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {sub.status === 'new' && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleUpdateSubmissionStatus(sub.id, 'reviewed')}
                            >
                              <Check className="w-4 h-4 text-green-600" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="font-outfit text-lg font-semibold">Projects</h2>
                <Dialog open={showProjectForm} onOpenChange={setShowProjectForm}>
                  <DialogTrigger asChild>
                    <Button className="btn-primary flex items-center gap-2" data-testid="add-project-btn">
                      <Plus className="w-4 h-4" />
                      Add Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{editingItem ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleProjectSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Client Name"
                          value={projectForm.client_name}
                          onChange={(e) => setProjectForm({...projectForm, client_name: e.target.value})}
                          required
                        />
                        <Input
                          placeholder="Project Type"
                          value={projectForm.project_type}
                          onChange={(e) => setProjectForm({...projectForm, project_type: e.target.value})}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Location"
                          value={projectForm.location}
                          onChange={(e) => setProjectForm({...projectForm, location: e.target.value})}
                          required
                        />
                        <Input
                          placeholder="Industry"
                          value={projectForm.industry}
                          onChange={(e) => setProjectForm({...projectForm, industry: e.target.value})}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          type="number"
                          placeholder="Year"
                          value={projectForm.year}
                          onChange={(e) => setProjectForm({...projectForm, year: parseInt(e.target.value)})}
                          required
                        />
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={projectForm.featured}
                            onChange={(e) => setProjectForm({...projectForm, featured: e.target.checked})}
                          />
                          Featured Project
                        </label>
                      </div>
                      <Textarea
                        placeholder="Project Summary"
                        value={projectForm.summary}
                        onChange={(e) => setProjectForm({...projectForm, summary: e.target.value})}
                        required
                      />
                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => {setShowProjectForm(false); resetProjectForm(); setEditingItem(null);}}>
                          Cancel
                        </Button>
                        <Button type="submit" className="btn-primary">
                          {editingItem ? 'Update' : 'Create'}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.client_name}</TableCell>
                      <TableCell>{project.project_type}</TableCell>
                      <TableCell>{project.industry}</TableCell>
                      <TableCell>{project.location}</TableCell>
                      <TableCell>{project.year}</TableCell>
                      <TableCell>{project.featured ? 'Yes' : 'No'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingItem(project);
                              setProjectForm(project);
                              setShowProjectForm(true);
                            }}
                          >
                            <PencilSimple className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteProject(project.id)}
                          >
                            <Trash className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="font-outfit text-lg font-semibold">Team Members</h2>
                <Dialog open={showTeamForm} onOpenChange={setShowTeamForm}>
                  <DialogTrigger asChild>
                    <Button className="btn-primary flex items-center gap-2" data-testid="add-team-btn">
                      <Plus className="w-4 h-4" />
                      Add Team Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{editingItem ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleTeamSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Name"
                          value={teamForm.name}
                          onChange={(e) => setTeamForm({...teamForm, name: e.target.value})}
                          required
                        />
                        <Input
                          placeholder="Role"
                          value={teamForm.role}
                          onChange={(e) => setTeamForm({...teamForm, role: e.target.value})}
                          required
                        />
                      </div>
                      <Input
                        placeholder="Expertise"
                        value={teamForm.expertise}
                        onChange={(e) => setTeamForm({...teamForm, expertise: e.target.value})}
                        required
                      />
                      <Input
                        placeholder="Image URL (optional)"
                        value={teamForm.image_url}
                        onChange={(e) => setTeamForm({...teamForm, image_url: e.target.value})}
                      />
                      <Input
                        type="number"
                        placeholder="Display Order"
                        value={teamForm.order}
                        onChange={(e) => setTeamForm({...teamForm, order: parseInt(e.target.value)})}
                      />
                      <Textarea
                        placeholder="Bio (optional)"
                        value={teamForm.bio}
                        onChange={(e) => setTeamForm({...teamForm, bio: e.target.value})}
                      />
                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => {setShowTeamForm(false); resetTeamForm(); setEditingItem(null);}}>
                          Cancel
                        </Button>
                        <Button type="submit" className="btn-primary">
                          {editingItem ? 'Update' : 'Create'}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Expertise</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {team.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{member.expertise}</TableCell>
                      <TableCell>{member.order}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingItem(member);
                              setTeamForm(member);
                              setShowTeamForm(true);
                            }}
                          >
                            <PencilSimple className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteTeam(member.id)}
                          >
                            <Trash className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="font-outfit text-lg font-semibold">Testimonials</h2>
                <Dialog open={showTestimonialForm} onOpenChange={setShowTestimonialForm}>
                  <DialogTrigger asChild>
                    <Button className="btn-primary flex items-center gap-2" data-testid="add-testimonial-btn">
                      <Plus className="w-4 h-4" />
                      Add Testimonial
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{editingItem ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Name"
                          value={testimonialForm.name}
                          onChange={(e) => setTestimonialForm({...testimonialForm, name: e.target.value})}
                          required
                        />
                        <Input
                          placeholder="Role"
                          value={testimonialForm.role}
                          onChange={(e) => setTestimonialForm({...testimonialForm, role: e.target.value})}
                          required
                        />
                      </div>
                      <Input
                        placeholder="Company"
                        value={testimonialForm.company}
                        onChange={(e) => setTestimonialForm({...testimonialForm, company: e.target.value})}
                        required
                      />
                      <Textarea
                        placeholder="Testimonial Content"
                        value={testimonialForm.content}
                        onChange={(e) => setTestimonialForm({...testimonialForm, content: e.target.value})}
                        required
                      />
                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => {setShowTestimonialForm(false); resetTestimonialForm(); setEditingItem(null);}}>
                          Cancel
                        </Button>
                        <Button type="submit" className="btn-primary">
                          {editingItem ? 'Update' : 'Create'}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell className="font-medium">{testimonial.name}</TableCell>
                      <TableCell>{testimonial.role}</TableCell>
                      <TableCell>{testimonial.company}</TableCell>
                      <TableCell className="max-w-xs truncate">{testimonial.content}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingItem(testimonial);
                              setTestimonialForm(testimonial);
                              setShowTestimonialForm(true);
                            }}
                          >
                            <PencilSimple className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteTestimonial(testimonial.id)}
                          >
                            <Trash className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPage;
