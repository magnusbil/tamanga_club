from rest_framework import serializers
from club.models import Poll, Choice

class PollSerializer(serializers.ModelSerializer):
    choices = serializers.SerializerMethodField()

    class Meta:
        model = Poll
        fields = ('id', 'poll_title', 'poll_start_date', 'poll_end_date', 'poll_total_votes', 'choices')
  
    def get_choices(self, poll):
        choice_query = Choice.objects.filter(poll=poll.id)
        choice_list = ChoiceSerializer(choice_query, many=True, context={"request": self.context['request']}).data
        return choice_list
    
class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ('id', 'poll', 'choice_title', 'votes')